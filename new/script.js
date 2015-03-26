var utils = {}
utils.onload = function(element) {
  element.classList.remove("hide")
}

var todos = {}

todos.controller = function(props) {

  this.todoItem = []

  this.size_ = function() {
    return this.todoItem.length
  }.bind(this)

  this.onload = utils.onload

  this.add = function(text) {
    var item = {
      _onclick: function(index, e) {
        this.todoItem[index]._completed = e.target.checked
        render.redraw()
      }.bind(this, this.todoItem.length),
      text: text,
      _config: function(element, isNew) {
        console.log(arguments)
      },
      _completed: false
    }
    this.todoItem.push(item)
  }.bind(this)

  this.remains = function() {
    return this.todoItem.filter(function(item) {
      return item._completed == false
    }).length
  }.bind(this)

}

todos.view = function(element, props, state) {

  var todo = '',
    doAdd = function(e) {
      if (todo == '') return
      state.add(todo)
      todo = ''
      e.target.value = ''
    }

  state.remaining = state.remains()
  state.size = state.todoItem.length + ' remaining'

  state.total = {
    _class: "total " + (state.todoItem.length > 0 ? 'show' : 'hide'),
  }

  if (state.remains() == 0 && state.todoItem.length > 0) {
    state.total._text = 'Done!'
    state.remaining = {
      _class: "remaining hide"
    }
    state.size = '';

  } else {
    state.remaining = {
      _class: "remaining",
      _text: state.remains() + ' of '
    }
    state.total._text = ''
  }

  state.input = {
    _onfocus: function(e) {
      e.target.value = ''
    },
    _value: todo,
    _onchange: function() {
      todo = this.value
    },
    _onkeyup: function(e) {
      if (e.which == 13) {
        doAdd(e)
      }
    }
  }

  state.button = {
    _onclick: doAdd
  }
}

todos.controller.onload = function() {
  console.log('test')
}

mag.module("todos", todos)

var app = {}

app.controller = function(props) {
  // console.log('ctrl call')

  this.show = mag.prop(true)
  this.name = '?'
  this.onload = utils.onload
}

app.view = function(element, props, state) {
  //console.log('view call')
  state.test = {
    _class: 'test ' + (state.show() ? 'show' : 'hide'),
    _html: 'Hello'
  }

  state.button = {
    _onclick: function() {
      state.show(!state.show())
    }
  }
  setTimeout(function() {
    state.name = 'world'
  }, 1000)
}

mag.module("test", app, {
  prop: true
})

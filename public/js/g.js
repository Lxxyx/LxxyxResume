'use strict'
var vm = new Vue({
  data: {
    expForm: null,
    lanForm: null,
    resume: {
      "username":"test",
      "title":"testResume",
      "header": {
        "title": {
          "name": null,
          "job": null
        },
        "contacts": {
          "mail": null,
          "wechat": null,
          "weibo": {
            "href": null,
            "name": null
          }
        }
      },
      "education": {
        "time": null,
        "name": null,
        "major": null,
        "honor": []
      }
    }
  },

  el: "body",

  methods: {
    addHonor: function() {
      var eduForm = document.querySelector("#education fieldset");
      var input = document.createElement('input');
      input.setAttribute("placeholder", "所得荣誉");

      eduForm.appendChild(input)
    },
    addCert: function() {
      var lan = document.querySelector("#language");
      var lanForm = this.lanForm.cloneNode(true);
      var addCertButton = document.querySelector("#addCert");

      lan.insertBefore(lanForm, addCertButton);
    },
    addTask: function() {
      var addTaskButton = document.querySelector("#experience fieldset button");
      var expForm = document.querySelector("#experience fieldset")
      var input = document.createElement('input');
      input.setAttribute("placeholder", "主要任务");

      expForm.insertBefore(input, addTaskButton)
    },
    addProject: function() {
      var exp = document.querySelector("#experience");
      var expForm = this.expForm.cloneNode(true);
      var addProjectButton = document.querySelector("#addProject");
      expForm.childNodes[11].onclick = function(e) {
        e.preventDefault();
        var input = document.createElement('input');
        input.setAttribute("placeholder", "主要任务");
        expForm.insertBefore(input, this)
      }

      exp.insertBefore(expForm, addProjectButton);
    },
    commit: function() {
      var that = this;
      $.ajax({
        url: "/gr",
        type: "post",
        data: that.resume,
        success: function(data) {
          console.log(data)
        },
        error: function(err) {
          console.log(err)
        }
      })
    }
  },

  ready: function() {
    this.expForm = document.querySelector("#experience fieldset").cloneNode(true);
    this.lanForm = document.querySelector("#language fieldset").cloneNode(true);
    console.log('Copy expForm and lanForm to Data');
  }
})

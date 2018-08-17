'use strict'

function Post (conn) {
  this._conn = conn
  this.postlist = {}
}

Post.prototype = {
  list: function (options) {
    this._conn.get('Post/post.json',options)
      .then((res) => {
          this.postlist = res.data
        }).catch((res) => {
          console.log(res)
        })
    return this._conn.get('Post/post.json',options)
  },
  getPost: function (title, options) {
    return this._conn.get('Post/' + title, options)
  },
  getPostTitleByIndex: function (index,option) {
    return this.postlist.data[index]
  },
  getPostInfoByTitle: function (title) {
    try{
      let len = this.postlist.data.length
      for(let i=0; i<len; i++){
       if(this.postlist.data[i].title == title){
          return this.postlist.data[i]
       }  
      } 
    }catch(e){
      this.list().then((res)=>{
         let len = this.postlist.data.length
      for(let i=0; i<len; i++){
       if(this.postlist.data[i].title == title){
          return this.postlist.data[i]
       }  
      } 
      })
    }   
    
  },
  getContentByTitle: function (title, options) {
    return this._conn.get('Post/' + title, options)
  },
  retrieve: function (slug, options) {
    return this._conn.get('Post/post.json' + slug + '/', options)
  },
  search: function (query, options) {
    var options = options || {}
    options.query = query || ''
    return this._conn.get('search/', options)
  }
}

module.exports = Post

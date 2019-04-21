Page({
  data: {
    newsId: '',
    newsDetail: {},
    newsContent: []
  },
  onLoad (options) {
    let newsId = options.newsId
    this.setData({
      newsId: newsId
    })
    this.getNewsDetail()
  },
  onPullDownRefresh () {
    this.getNewsDetail(() => {
      wx.stopPullDownRefresh()
    })
  },
  getNewsDetail (callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: this.data.newsId,
      },
      success: res => {
        let result = res.data.result
        this.formatNewsDetail(result)
      },
      complete: () => {
        callback && callback()
      }
    })
  },
  formatNewsDetail (result) {
    let date = new Date(result.date);
    let hour = (date.getHours() < 10 ? '0' : '') + date.getHours()
    let minute = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
    result.time = hour + ':' + minute
    this.setData({
      newsDetail: result,
      newsContent: result.content
    })
  }
})
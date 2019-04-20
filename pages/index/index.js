Page({
  data: {
    channelArr: [
      { value: 'gn', label: '国内' },
      { value: 'gj', label: '国际' },
      { value: 'cj', label: '财经' },
      { value: 'yl', label: '娱乐' },
      { value: 'js', label: '军事' },
      { value: 'ty', label: '体育' },
      { value: 'other', label: '其他' },
    ],
    channel: 'gn',
    newsList: [],
  },
  onLoad () {
    this.getNewsList()
  },
  onTapChannel(e) {
    let channel = e.currentTarget.dataset.channel
    this.setData({
      channel: channel
    })
    this.getNewsList()
  },
  getNewsList (callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: this.data.channel
      },
      success: res => {
        let result = res.data.result
        result.forEach(item => {
          let date = new Date(item.date);
          let hour = (date.getHours() < 10 ? '0' : '') + date.getHours()
          let minute = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
          item.time = hour + ':' + minute 
          let source = item.source.split('/')
          item.cp = source.length > 0 ? source[0] : item.source
          let firstImage = item.firstImage
          if (item.firstImage.indexOf('http:') == -1) {
            item.firstImage = 'https:' + item.firstImage
          }
        })
        console.log(result)
        this.setData({
          newsList: result
        })
      },
      complete: () => {
        callback && callback()
      }
    })
  },
  onPullDownRefresh () {
    this.getNewsList(() => {
      wx.stopPullDownRefresh()
    })
  },
})

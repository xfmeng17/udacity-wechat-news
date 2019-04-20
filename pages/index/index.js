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
    currChannel: 'gn',
  },
  changeChannel(e) {
    // console.log(e)
    let channel = e.currentTarget.dataset.channel
    this.setData({
      currChannel: channel
    })
    this.getNews(channel)
  },
  getNews (channel) {
    console.log('channel = ', channel)
  }
})

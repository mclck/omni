(function () {

  var bv = new Bideo();
  bv.init({
    // Video element
    videoEl: document.querySelector('#background_video'),

    // Container element
    container: document.querySelector('body'),

    // Resize
    resize: true,

    // autoplay: false,

    isMobile: window.matchMedia('(max-width: 768px)').matches,

    // Array of objects containing the src and type
    // of different video formats to add
    src: [
      {
        src: 'video/sky.mp4',
        type: 'video/mp4'
      }
    ],
  });
}());

$(document).ready(function () {

  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  let dealCode = getParameterByName('dealCode');
  let inflId   = getParameterByName('influencerId');
  let campId   = getParameterByName('campaignId');

  let cookieDealCode = $.cookie('cookieDealCode');
  let cookieInflId   = $.cookie('cookieInflId');
  let cookieCampId   = $.cookie('cookieCampId');

  if (!cookieDealCode || !cookieInflId || !cookieCampId) {
    if (dealCode && inflId && campId) {
      $.cookie('cookieDealCode', dealCode);
      $.cookie('cookieInflId', inflId);
      $.cookie('cookieCampId', campId);
    };
  };

  $("#click").click(function(e) {

    e.preventDefault();
    e.stopPropagation();

    let cookieDealCode = $.cookie('cookieDealCode');
    let cookieInflId   = $.cookie('cookieInflId');
    let cookieCampId   = $.cookie('cookieCampId');

    $.ajax({
      method: "POST",
      url: "http://localhost:3000/deals",
      data: {
        deal: {
          price: 500.00,
          campaign_id: cookieCampId,
          influencer_id: cookieInflId
        }
      }
    })

    $.removeCookie('cookieDealCode');
    $.removeCookie('cookieInflId');
    $.removeCookie('cookieCampId');

  })
})

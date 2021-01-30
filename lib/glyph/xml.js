
module.exports = (xml) => {

    let s = xml.svg.$;
    let v = s.viewBox;
    let w = s.width;
    let h = s.height;
    let d = xml.svg.path[0].$.d;

    if (!w || !h) {
        let b = v && v.split(' ');
        w = !w ? b && b[2] : w;
        h = !h ? b && b[3] : h;
    }

    return {
          width: parseInt(w),
         height: parseInt(h),
        viewBox: v || '0 0 w h',
              d: d
    };
};
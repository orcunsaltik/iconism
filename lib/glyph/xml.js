module.exports = (xml) => {
  const s = xml.svg.$;
  const v = s.viewBox;
  let w = s.width;
  let h = s.height;
  const d = xml.svg.path[0].$.d;

  if (!w || !h) {
    const b = v && v.split(' ');
    w = !w ? b && b[2] : w;
    h = !h ? b && b[3] : h;
  }

  return {
    width: parseInt(w),
    height: parseInt(h),
    viewBox: v || '0 0 w h',
    d
  };
};

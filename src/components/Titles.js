class Titles {
  mainTitle(props) {
    const view = `
      <h1 class="text-center" style="font-size: 30px;">
          <img src="${props.urlIcon}" alt="" width="40px" style="
      vertical-align: middle;">
          ${props.title}
      </h1>
      `;
    return view;
  };
  subTitle(props) {
    const view = `
      <h5 class=" ${props.mt ? `mt-${props.mt}` : ''}">
          <img src="${props.urlIcon}" alt="" width="30px" style="
      vertical-align: bottom;">
          ${props.title}
      </h5>
      `;
    return view;
  };
  miniSubTitle(props) {
    const view = `
      <h6 class="${props.color ? `text-${props.color}` : ''} ${props.mt ? `mt-${props.mt}` : ''}">
          <img src="${props.urlIcon}" alt="" width="25px" style="
      vertical-align: middle;">
          ${props.title}
      </h6>
      `;
    return view;
  };
}


export default Titles

export const injectStyles = (svgElement: any, styles: any = "") => {
  styles;
  if (!svgElement) return;
  const observer = new MutationObserver((mutations) => {
    if (!mutations.length) return;
    mutations.forEach((mutation) => {
      if (!mutation.addedNodes.length) return;
    });
    const links = svgElement.querySelectorAll("a");
    if (!links.length) return;
    links.forEach((link: any) => {
      link.setAttribute("target", "_blank");
    });
  });
  observer.observe(svgElement, {
    childList: true,
    subtree: true,
  });
  const style = document.createElement("style");
  style.textContent = ``;
  svgElement.setAttribute("data-type", "markmap");
  svgElement.appendChild(style);
};

export const scrollBy = (e, element) => {
  e.preventDefault();

  if (e.target.hash !== '' && document.querySelector(element)) {
    const elementTopOffset = document.querySelector(element).offsetTop;

    window.scrollTo({
      top: elementTopOffset,
      behavior: 'smooth',
    });
  } else {
    document.location.href = `${e.target.href}`;
  }
};

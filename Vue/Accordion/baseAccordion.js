import './baseAccordion.scss';

document.addEventListener('DOMContentLoaded', () => {
  const accordions = [...document.querySelectorAll('.baseAccordion')];

  accordions.forEach((accordion) => {
    const accordionItems = [...accordion.querySelectorAll('.baseAccordion__item')];

    accordionItems.forEach((accordionItem) => {
      const accordionHeader = accordionItem.querySelector('.baseAccordion__header');
      const body = accordionItem.querySelector('.baseAccordion__body');
      const bodyWrapper = body.querySelector('.baseAccordion__wrapper');

      accordionHeader.addEventListener('click', () => {
        if (accordionItem.classList.contains('baseAccordion__item--active')) {
          const wrapperHeight = bodyWrapper.scrollHeight;
          accordionItem.classList.remove('baseAccordion__item--active');
          body.style.maxHeight = `${wrapperHeight}px`;

          setTimeout(() => { body.style.maxHeight = 0; }, 10);
          return;
        }

        const wrapperHeight = bodyWrapper.scrollHeight;
        const currentOpen = accordionItems
          .filter(item => item.classList.contains('baseAccordion__item--active'));

        if (currentOpen.length > 0) {
          const currentOpenBody = currentOpen[0].querySelector('.baseAccordion__body');
          const currentOpenBodyHeight = currentOpenBody.scrollHeight;
          currentOpen[0].classList.remove('baseAccordion__item--active');
          currentOpenBody.style.maxHeight = `${currentOpenBodyHeight}px`;
          setTimeout(() => { currentOpenBody.style.maxHeight = 0; }, 10);
        }

        accordionItem.classList.add('baseAccordion__item--active');
        body.style.maxHeight = `${wrapperHeight}px`;

        setTimeout(() => { body.style.maxHeight = null; }, 300);
      });
    });
  });
});

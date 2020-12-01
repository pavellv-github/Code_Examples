import $ from 'jquery';
import './dropDownBlock.scss';

const classNames = {
  parent: 'dropDownBlock',
  title: 'dropDownBlock__title',
  icon: 'dropDownBlock__icon',
  text: 'dropDownBlock__text',
  content: 'dropDownBlock__content',
  open: 'dropDownBlock--opened',
};

function toggle() {
  const $parent = $(this).parents(`.${classNames.parent}`);

  if ($parent.attr('data-checkbox-relation') !== undefined) {
    const isWasOpen = $parent.hasClass(classNames.open);
    const $relationCheckBoxes = $($parent.attr('data-checkbox-relation'));
    $relationCheckBoxes.each((ind, checkbox) => {
      if (isWasOpen === false) $(checkbox).prop('checked', true);
      else $(checkbox).prop('checked', false);
    });
  }

  $parent.toggleClass(classNames.open);
  $parent.find('.dropDownBlock__text').slideToggle();
  $parent.find('.dropDownBlock__content').slideToggle();
}

$(document).ready(() => {
  $(`.${classNames.parent}`).each((index, element) => {
    const $parent = $(element);
    const $title = $parent.find(`.${classNames.title}`);
    const $icon = $parent.find(`.${classNames.icon}`);

    $title.on('click', toggle);

    if ($parent.attr('data-checkbox-relation') !== undefined) {
      const $relationCheckBoxes = $($parent.attr('data-checkbox-relation'));
      $relationCheckBoxes.each((ind, checkbox) => {
        const $checkbox = $(checkbox);
        $checkbox.on('change', () => {
          if ($checkbox.is(':checked') === true) {
            $parent.trigger('open');
          } else {
            $parent.trigger('close');
          }
        });
      });
    }
  });
});

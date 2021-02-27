function customDropdown() {
  const originalDropdownDiv = document.getElementById('dropdown-internal-div');
  const originalSelect = originalDropdownDiv.getElementsByTagName('select')[0];
  const originalSelectLength = originalSelect.length;

  const newSelectedOptionDiv = document.createElement('DIV'); //A
  newSelectedOptionDiv.setAttribute('class', 'selected-option');
  newSelectedOptionDiv.innerHTML =
    originalSelect.options[originalSelect.selectedIndex].innerHTML;
  originalDropdownDiv.appendChild(newSelectedOptionDiv);

  const newOptionDiv = document.createElement('DIV'); //B
  newOptionDiv.setAttribute('class', 'option hide-option');

  for (let index = 1; index < originalSelectLength; index++) {
    const newOptionItem = document.createElement('DIV'); //C
    newOptionItem.innerHTML = originalSelect.options[index].innerHTML;
    newOptionItem.addEventListener('click', function (e) {
      const newSelect = this.parentNode.previousSibling;
      for (let i = 0; i < originalSelect.length; i++) {
        if (originalSelect.options[i].innerHTML == this.innerHTML) {
          originalSelect.selectedIndex = i;
          newSelect.innerHTML = this.innerHTML;
          const otherSelected = this.parentNode.getElementsByClassName(
            'other-selected'
          );
          for (let x = 0; x < otherSelected.length; x++) {
            otherSelected[x].removeAttribute('class');
          }
          this.setAttribute('class', 'other-selected');
          break;
        }
      }
      newSelect.click();
    });
    newOptionDiv.appendChild(newOptionItem);
  }
  originalDropdownDiv.appendChild(newOptionDiv);
  newSelectedOptionDiv.addEventListener('click', function (e) {
    e.stopPropagation();
    closeDropdown(this);
    this.nextSibling.classList.toggle('hide-option');
    this.classList.toggle('selected-active');
  });
}

function closeDropdown(e) {
  const allNewOptions = [];
  const newOptionDiv = document.getElementsByClassName('option');
  const newSelectedOptionDiv = document.getElementsByClassName(
    'selected-option'
  );
  for (index = 0; index < newSelectedOptionDiv.length; index++) {
    if (e == newSelectedOptionDiv[index]) {
      allNewOptions.push(index);
    } else {
      newSelectedOptionDiv[index].classList.remove('selected-active');
    }
  }
  for (i = 0; i < newOptionDiv.length; i++) {
    if (allNewOptions.indexOf(i)) {
      newOptionDiv[i].classList.add('hide-option');
    }
  }
}

window.addEventListener('load', customDropdown);
document.addEventListener('click', closeDropdown);

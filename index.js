const main = document.getElementById("main")
const playground = document.getElementById("playground")
const playgroundRect = playground.getBoundingClientRect();

dragElement(main);
makeResizableDiv(main)

function dragElement(element) {
var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
document.getElementById("header").onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    element.style.top = (element.offsetTop - pos2) + "px";
    element.style.left = (element.offsetLeft - pos1) + "px";

if(element.offsetTop < playgroundRect.top){
element.style.top = playgroundRect.top + "px";
}
if(element.offsetTop+element.offsetHeight > playgroundRect.bottom){
element.style.top = (playgroundRect.bottom-element.offsetHeight) + "px";
}
if(element.offsetLeft < playgroundRect.left){
element.style.left = playgroundRect.left + "px";
}
if(element.offsetLeft+element.offsetWidth > playgroundRect.right){
element.style.left = (playgroundRect.right-element.offsetWidth) + "px";
}

  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function makeResizableDiv(element) {
  const resizers = document.querySelectorAll(' .resizer')
  const minimum_size = 150;
  let original_width = 0;
  let original_height = 0;
  let original_x = 0;
  let original_y = 0;
  let original_mouse_x = 0;
  let original_mouse_y = 0;
  for (let i = 0;i < resizers.length; i++) {
    const currentResizer = resizers[i];
    currentResizer.addEventListener('mousedown', function(e) {
      e.preventDefault()
      original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
      original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
      original_x = element.getBoundingClientRect().left;
      original_y = element.getBoundingClientRect().top;
      original_mouse_x = e.pageX;
      original_mouse_y = e.pageY;
      window.addEventListener('mousemove', resize)
      window.addEventListener('mouseup', stopResize)
    })
    
    function resize(e) {
  
// console.log(e.pageX)
// console.log(playgroundRect.right)
// if(element.offsetLeft < playgroundRect.left){
// element.style.left = playgroundRect.left + "px";
// }

      if (currentResizer.classList.contains('bottom-right')) {
  
        const width = original_width + (e.pageX - original_mouse_x);
        const height = original_height + (e.pageY - original_mouse_y)
        if (width > minimum_size && e.pageX < playgroundRect.right) {
          element.style.width = width + 'px'
        }
        if (height > minimum_size && e.pageY < playgroundRect.bottom) {
          element.style.height = height + 'px'
        }
      }
      else if (currentResizer.classList.contains('bottom-left')) {
        const height = original_height + (e.pageY - original_mouse_y)
        const width = original_width - (e.pageX - original_mouse_x)
        if (height > minimum_size && e.pageY < playgroundRect.bottom) {
          element.style.height = height + 'px'
        }
        if (width > minimum_size && e.pageX > playgroundRect.left) {
          element.style.width = width + 'px'
          element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
        }
      }
      else if (currentResizer.classList.contains('top-right')) {
        const width = original_width + (e.pageX - original_mouse_x)
        const height = original_height - (e.pageY - original_mouse_y)
        if (width > minimum_size && e.pageX < playgroundRect.right) {
          element.style.width = width + 'px'
        }
        if (height > minimum_size && e.pageY > playgroundRect.top) {
          element.style.height = height + 'px'
          element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
        }
      }
      else {
        const width = original_width - (e.pageX - original_mouse_x)
        const height = original_height - (e.pageY - original_mouse_y)
        if (width > minimum_size && e.pageX > playgroundRect.left) {
          element.style.width = width + 'px'
          element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
        }
        if (height > minimum_size && e.pageY > playgroundRect.top) {
          element.style.height = height + 'px'
          element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
        }
      }
    }
    
    function stopResize() {
      window.removeEventListener('mousemove', resize)
    }
  }
}


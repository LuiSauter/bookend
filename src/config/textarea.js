if (typeof window !== 'undefined') {
  var description = document.getElementById('description')
}
function getScrollHeight(elm) {
  var savedValue = elm.value
  elm.value = ''
  elm._baseScrollHeight = elm.scrollHeight
  elm.value = savedValue
}
export default function onExpandableTextareaInput({ target: elm }) {
  // make sure the input event originated from a textarea and it's desired to be auto-expandable
  if (!description || !elm.nodeName == 'TEXTAREA') return

  var minRows = elm.getAttribute('data-min-rows') | 0,
    rows
  !elm._baseScrollHeight && getScrollHeight(elm)

  elm.rows = minRows
  rows = Math.ceil((elm.scrollHeight - elm._baseScrollHeight) / 24)
  elm.rows = minRows + rows
}

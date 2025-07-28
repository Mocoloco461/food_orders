const video = document.getElementById('preview');
const list = document.getElementById('list');
const socket = io();

// Start camera and scanner
const codeReader = new ZXing.BrowserMultiFormatReader();
codeReader.decodeFromVideoDevice({ facingMode: 'environment' }, video, (result, err) => {
  if (result) {
    socket.emit('barcode', result.text);
  }
});

socket.on('init', (items) => {
  list.innerHTML = '';
  items.forEach(addItem);
});

socket.on('barcode', addItem);

function addItem({ code, time }) {
  const li = document.createElement('li');
  li.textContent = `${code} - ${new Date(time).toLocaleString()}`;
  list.appendChild(li);
}

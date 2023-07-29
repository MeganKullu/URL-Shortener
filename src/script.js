
  const toggleButton = document.getElementById('toggle');
  const menu = document.getElementById('menu');

  toggleButton.addEventListener('click', () => {
    menu.classList.toggle('hidden'); // Toggle the 'hidden' class on the menu div
  });

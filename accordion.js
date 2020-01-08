function toggle() {
    const content = document.querySelector('#extra');
    const btn = document.querySelector('.button');

    if (content.style.display === '' || content.style.display === 'none') {
        content.style.display = 'block';
        btn.innerHTML = 'Less';
    } else {
        content.style.display = 'none';
        btn.innerHTML = 'More';
    }
}
function showArticle() {
  const val = document.getElementById('searchInput').value.trim().toLowerCase();
  if(val === 'peafowl' || val === 'peacock' || val === 'peahen' || !val) {
    window.scrollTo({top: 0, behavior: 'smooth'});
  } else {
    alert('No search results for "' + val + '" in this demo.');
  }
}

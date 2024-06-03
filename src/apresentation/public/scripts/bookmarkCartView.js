function printBookmark() {
  const elem = document.querySelector(".preview-bookmark").parentElement;
  var mywindow = window.open("", "PRINT", "height=1000,width=1000");
  mywindow.document.write("<html><head><title>" + document.title + "</title>");
  mywindow.document.write(
    '<link rel="stylesheet" href="/styles/bookmarkCartView.css">',
  );
  mywindow.document.write("</head><body >");
  mywindow.document.write(elem.innerHTML);
  mywindow.document.write("</body></html>");

  mywindow.document.close(); // necessary for IE >= 10
  mywindow.focus(); // necessary for IE >= 10*/
  setTimeout(() => {
    mywindow.print();
  }, 1000);
  //mywindow.close();

  return true;
}

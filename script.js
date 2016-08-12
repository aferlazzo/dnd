/****
 *
 * event handlers for drag and drop
 *
 */
function dragStart(ev) {
    ev.dataTransfer.effectAllowed='move';
    ev.dataTransfer.setData("Text", ev.target.getAttribute('id'));
    ev.dataTransfer.setDragImage(ev.target,0,0);

    return true;
}

function dragEnter() {
    event.preventDefault();
    return true;
}

function dragOver(ev) {
    return false;
}

function dragDrop(ev) {
    var src = ev.dataTransfer.getData("Text");
    ev.target.appendChild(document.getElementById(src));
    ev.stopPropagation();
    return false;
}


/**
 *
 * putImagesOnPage
 *
 * Without the aid of JavaScript libraries or frameworks read a JSON array of URLs of the images
 * that will later be dragged and dropped.
 *
 */



    var putImagesOnPage = {

        // Helper function to get an element's exact position
        getPosition: function(el) {
            var xPos = 0;
            var yPos = 0;

            while (el) {
                if (el.tagName == "BODY") {
                    // deal with browser quirks with body/window/document and page scroll
                    var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
                    var yScroll = el.scrollTop || document.documentElement.scrollTop;

                    xPos += (el.offsetLeft - xScroll + el.clientLeft);
                    yPos += (el.offsetTop - yScroll + el.clientTop);
                } else {
                    // for all other non-BODY elements
                    xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
                    yPos += (el.offsetTop - el.scrollTop + el.clientTop);
                }

                el = el.offsetParent;
            }
            return {
                x: xPos,
                y: yPos
            };
        },


        putImageInDom: function(pathArray) {
            var imagesInDom = document.getElementsByClassName('picture');
            var i;
            var top;
            var left;
            var  current;

            for (i = 0; i < pathArray.length; i++) {
                imagesInDom[i].src = pathArray[i].image_path;

                current = this.getPosition(document.getElementById(imagesInDom[i].id));
                console.log(imagesInDom[i].id, " is located at top: ", current.y, " left: ", current.x);
            }
        },

        ajaxGet: function () {
            var xhr = new XMLHttpRequest();
            var url = "images.json";

            //set up Ajax
            xhr.onreadystatechange = function () {
                var imagePaths;

                if (xhr.readyState == 4 && xhr.status == 200) {
                    imagePaths = JSON.parse(xhr.responseText);
                    putImagesOnPage.putImageInDom(imagePaths);
                }
            };
            xhr.open("GET", url, true);
            xhr.send();
        }
    };

    putImagesOnPage.ajaxGet();



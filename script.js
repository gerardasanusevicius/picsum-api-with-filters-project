const apiUrl = "https://picsum.photos/v2/list/";
const imageContainer = document.querySelector("#imageOutlet");
const enlargedImageBox = document.querySelector("#enlargedImageBox");
const blurRange = document.getElementById("blurRange");
const checkBox = document.getElementById("checkBox");

// Image fetching

async function fetchImages() {
  try {
    const response = await fetch(apiUrl);
    const images = await response.json();

    return images;
  } catch (error) {
    console.log(error);
    imageContainer.innerHTML = "error";
  }
}

// Image displaying 

fetchImages().then(images => {
    images.forEach(function (image) {
      imageContainer.innerHTML += `
    <div class="imageBox" onClick=(enlargeImage(${image.id}))><img class="smallImage" src="${image.download_url}"
    </div>`;
    })
})

// Image enlargement

function enlargeImage(id) {
    fetchImages().then(images => {
      const filteredImage = images.filter(image => Number(image.id) === Number(id))[0];

      // clearing

      enlargedImageBox.innerHTML = ``;

      // image enlargement and filters

      const newImage = document.createElement("img");
         newImage.setAttribute('class', 'largeImage');
         newImage.setAttribute('src', `${filteredImage.download_url}`);
      if (checkBox.checked === true){
         newImage.style.filter = `grayscale(1) blur(${blurRange.value}px)`;
        } else {
         newImage.style.filter = `grayscale(0) blur(${blurRange.value}px)`;
        }

        // image information

      const newInfo = document.createElement("h5");
        newInfo.setAttribute('class', "imageInfo");
        newInfo.innerHTML = 
        `
        Author: ${filteredImage.author}
        <br>
        Width: ${filteredImage.width}
        <br>
        Height: ${filteredImage.height}
        `

        // appending

        enlargedImageBox.appendChild(newImage);
        enlargedImageBox.appendChild(newInfo);
    })
}

//  Filter function

function filterAdjustment() {
  const largeImage = document.querySelector(".largeImage");

  if (checkBox.checked === true){
    largeImage.style.filter = `grayscale(1) blur(${blurRange.value}px)`;
  } else {
    largeImage.style.filter = `grayscale(0) blur(${blurRange.value}px)`;
  }
};


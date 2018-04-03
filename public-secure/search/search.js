'use strict';

function getAllBreedNames() {
  $.get('/breeds/all')
    .done(function(data) {
      showBreedsInSelectBar(data);
    })
    .fail(function (err) {
      console.log(err);
    });
}

function showBreedsInSelectBar(data) { 
  let html = '<select name="selectedBreed" id="breedSearch">';
  for (var i=0; i<data.length; i++) {
    html += `<option value='${data[i].value}'>${data[i].inputText}</option>`;
  }
  html += '</select>';
  $('#selectBar').append(html);
}

$('.js-search-button').click(function() {
  let typedInput = $('#breedSearch').val().toLowerCase();
  window.location.href = `/breeds/${typedInput}`;
});
$('.js-random-search-button').click(function() {
  let randomBreed = dogBreedArray[Math.floor(Math.random() * dogBreedArray.length)];
  window.location.href = `/breeds/${randomBreed}`;  
});

const dogBreedArray = ['affenpinscher', 'african', 'airedale', 'akita', 'appenzeller', 'basenji',
  'beagle', 'bluetick', 'borzoi', 'bouvier', 'boxer', 'brabancon', 'briard', 'boston bulldog',
  'french bulldog', 'staffordshire bullterrier', 'cairn', 'chihuahua', 'chow', 'clumber',
  'border collie', 'coonhound', 'cardigan corgi', 'dachshund', 'great dane', 'scottish deerhound',
  'dhole', 'dingo', 'doberman', 'norwegian elkhound', 'entlebucher', 'eskimo', 'germanshepherd',
  'italian greyhound', 'goenendael', 'ibizan hound', 'afghan hound', 'basset hound', 'blood hound',
  'english hound', 'walker hound', 'husky', 'keeshond', 'kelpie', 'komondor', 'kuvasz', 'labrador',
  'leonberg', 'lhasa', 'malamute', 'malinois', 'maltese', 'bull mastiff', 'tibetan mastiff',
  'bernese mountain', 'swiss mountain', 'newfoundland', 'otterhound', 'papillon', 'pekinese',
  'pembroke', 'miniature pinscher', 'german pointer', 'pomeranian', 'miniature poodle', 
  'standard poodle', 'toy poodle', 'pug', 'pyrenees', 'redbone', 'chesapeake retriever', 
  'curly retriever', 'flatcoated retriever', 'golden retriever', 'rhodesian ridgeback', 'rottweiler',
  'saluki', 'samoyed', 'schipperke', 'giant schnauzer', 'miniature schanuzer', 'english setter', 
  'gordon setter', 'irish setter', 'english sheepdog', 'shetland sheepdog', 'shiba', 'shihtzu',
  'blenheim spaniel', 'brittany spaniel', 'cocker spaniel', 'irish spaniel', 'japanese spaniel',
  'sussex spaniel', 'welsh spaniel', 'english springer', 'stbernard', 'american terrier',
  'australian terrier', 'bedlington terrier', 'border terrier', 'dandie terrier', 'fox terrier',
  'irish terrier', 'kerryblue terrier', 'lakeland terrier', 'norfolk terrier', 'norwich terrier',
  'patterdale terrier', 'scottish terrier', 'sealyham terrier', 'silky terrier', 'tibetan terrier',
  'toy terrier', 'westhighland terrier', 'wheaten terrier', 'yorkshire terrier', 'vizsla',
  'weimaraner', 'whippet', 'irish wolfhound'];
//array of all breeds for random search purposes. is in all lower case to
//match the fact that regular search value is translated to all lower case

$(document).ready(function() {
  getAllBreedNames();
});
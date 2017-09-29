$('.js-search-button').click(function(event) {
  let typedInput = $('#breedSearch').val().toLowerCase();
  $.ajax({
    url: '/breeds/search/' + typedInput,
    method: 'GET',
  })
    .done(function (done) {
      window.location.href = done.url;
    })
    .fail(function (fail) {
      console.log(fail);
    });
  $('#breedSearch').val('');
});
//makes call to breeds/search/:breedName route on the backend.
//then uses the saveInputFromBreedSearch backend function to return a url
//and then the .done in line 7 redirects to that url, which triggers
//that route and it's corresponding functions on the backend

//array of all breeds for random search purposes. is in all lower case to
//match the fact that regular search value is translated to all lower case
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

$('.js-random-search-button').click(function(event) {
  let randomBreed = dogBreedArray[Math.floor(Math.random() * dogBreedArray.length)];
  $.ajax({
    url: '/breeds/search/' + randomBreed,
    method: 'GET',
  })
    .done(function (done) {
      window.location.href = done.url;
    })
    .fail(function (fail) {
      console.log(fail);
    });
  $('#breedSearch').val('');  
});
//same function as above, just with randomized dog breed

$('.js-view-favorites-button').click(function(event) {
  window.location.href = 'favorites';
});

$('.js-log-out-button').click(function(event) {
  window.location.href = '/auth/logout';
});





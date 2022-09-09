

//======================================================================
// VARIABLES
//======================================================================

// Variables: Selected DOM Elements
const itemsCollectedValueDisplay =
document.querySelector( ".items-collected-value-display" );

const itemsTotalValueDisplay =
document.querySelector( ".items-total-value-display" );

const itemInputBox = document.querySelector(".item-input-box");

const clearAllItemsButton =
document.querySelector( ".clear-all-items-button" );

const clearCollectedListItemsButton =
document.querySelector( ".clear-collected-items-button" );

const listItemsContainer = document.querySelector( ".list-items-container" );


// Variables: Other Program Variables
const listItems = [];

//======================================================================
// FUNCTIONS
//======================================================================

// Create a List Item and Return it
const createListItem = function( itemInputBoxValue ) {

  // create all elements needed with their class name
  const newListItem = document.createElement( "LI" );
  newListItem.classList.add( "list-item" );
  const newListItemLeft = document.createElement( "DIV" );
  newListItemLeft.classList.add( "list-item-left" );
  const newCheckArea = document.createElement( "SPAN" );
  newCheckArea.classList.add( "check-area" );
  const newListItemText = document.createElement( "SPAN" );
  newListItemText.classList.add( "list-item-text" );
  newListItemText.textContent = itemInputBoxValue;
  const newListItemRight = document.createElement( "DIV" );
  newListItemRight.classList.add( "list-item-right" );
  const newTrash = document.createElement( "I" );
  newTrash.classList.add( "fa-solid", "fa-trash-can", "trash" );

  // append each child element to their parent
  newListItemRight.appendChild( newTrash );
  newListItemLeft.appendChild( newCheckArea );
  newListItemLeft.appendChild( newListItemText );
  newListItem.appendChild( newListItemLeft );
  newListItem.appendChild( newListItemRight );

  // return the new List Item
  return newListItem;
}

const toggleDisableCheckArea = function( listItem ) {
  const checkArea = listItem.children[ 0 ].children[ 0 ];
  checkArea.classList.toggle( "border-color-disable" );
  checkArea.classList.toggle( "background-color-disable" );
}

const toggleDisableText = function( listItem ) {
  listItem.children[ 0 ].children[ 1 ].classList.toggle( "text-disable" );
}

const toggleEnableTrash = function( listItem ) {
  listItem.children[ 1 ].children[ 0 ].classList.toggle( "display-trash" );
  listItem.children[ 1 ].classList.toggle( "enable-pointer-event" );
}

const toggleDisableBorderRight = function( listItem ) {
  listItem.classList.toggle( "border-right-disable" );
}

const disableListItem = function( listItem ) {
  toggleDisableCheckArea( listItem );
  toggleDisableText( listItem );
  toggleEnableTrash( listItem );
  toggleDisableBorderRight( listItem );
}

const countCollectedItems = function( array ) {
  let countedItems = 0;
  for( let i = 0; i < array.length; i++ ) {
    if( array[ i ].classList.contains( "border-right-disable" ) ) {
      countedItems++;
    }
  }
  return countedItems;
}

const assignBorderColorToListItemCheckArea = function( array ) {

  // Loop the given array ( listItems )
  for( let i = 0; i < array.length; i++ ) {

    // Capture the current list item's check-area element
    let currentListItem = array[ i ].children[ 0 ].children[ 0 ];

    // If 1, 3, 5, ... give the check-area element the pink border color
    // Else give the check-area element the blue border color
    if( i % 2 === 0 ) {
      currentListItem.classList.add( "border-secondary-color" );
      if( currentListItem.classList.contains( "border-tertiary-color" ) ) {
        currentListItem.classList.remove( "border-tertiary-color" );
      }
    } else {
      currentListItem.classList.add( "border-tertiary-color" );
      if( currentListItem.classList.contains( "border-secondary-color" ) ) {
        currentListItem.classList.remove( "border-secondary-color" );
      }
    }
  }
}

//======================================================================
// 
//======================================================================


//======================================================================
// EVENTS
//======================================================================

// INPUT EVENT
itemInputBox.addEventListener( "keydown", function( e ) {

  // when there is a value and enter key is pressed
  if( this.value && e.keyCode === 13 ) {

    // Capture new List Item
    const newlyCreatedListItem = createListItem( this.value );

    // Give new List Item its popIn animation
    newlyCreatedListItem.classList.add( "animation--pop-in" );

    // Append to listItems Array
    listItems.push( newlyCreatedListItem );

    // Give list item's check area their appropriate border color
    assignBorderColorToListItemCheckArea( listItems );

    // Finally, add the new list item into the list-items-container in the DOM
    listItemsContainer.appendChild( newlyCreatedListItem );

    // Reset item-input-box value and display the length of the list
    this.value = "";
    itemsTotalValueDisplay.textContent = listItems.length; 
  }
} );

// CLEAR ALL LIST ITEMS EVENT
clearAllItemsButton.addEventListener( "click", function() {

  // =====================================
  // First way to accomplish this task
  // =====================================

  // While there are list items in listItems array
  // while( listItems.length > 0 ) {

    // Capture list item being removed
    // const poppedListItem = listItems.pop();

    // Add popOff animation
    // poppedListItem.classList.add( "animation--pop-off" );

    // After 350 milliseconds, remove the list item from the DOM
    // setTimeout(() => {
    //   poppedListItem.remove();
    // }, 350);
  // }

  // ========================================
  // Second way to accomplish this task
  // ========================================
  // Create new array to capture list items to be cleared
  const listItemsToBeCleared = [];

  // Add items to be cleared to new array
  for( let i = 0; i < listItems.length; i++ ) {
    listItemsToBeCleared.push( listItems[ i ] );
  }

  // Traverse through new array
  for( let i = 0; i < listItemsToBeCleared.length; i++ ) {

    // Capture the index of the list items to be cleared
    const listItemsToBeClearedIndex = listItems.indexOf( listItemsToBeCleared[ i ] );

    // Remove list items from listItems array
    listItems.splice( listItemsToBeClearedIndex, 1 );

    // Add animation popOff
    listItemsToBeCleared[ i ].classList.add( "animation--pop-off" );

    // After 350 milliseconds, remove list item from the DOM
    setTimeout(() => {
      listItemsToBeCleared[ i ].remove();
    }, 350);
  }

  // Reset collected and total values and Display them
  itemsCollectedValueDisplay.textContent = 0;
  itemsTotalValueDisplay.textContent = 0;
} );

// CLEAR COLLECTED LIST ITEMS EVENT
clearCollectedListItemsButton.addEventListener( "click", function() {

  // Create array to hold collected list items
  const collectedListItems = [];

  // Fill new array with Collected List Items
  for( let i = 0; i < listItems.length; i++ ) {
    if( listItems[ i ].classList.contains( "border-right-disable" ) ) {
      collectedListItems.push( listItems[ i ] );
    }
  }

  // Use new array to find the collected list item's index in listItems array
  // and remove them from that array aswell as remove them from the DOM
  for( let i = 0; i < collectedListItems.length; i++ ) {
    const collectedListItemIndex = listItems.indexOf( collectedListItems[ i ] );
    listItems.splice( collectedListItemIndex, 1 );

    // Add animation popOff before removing the list item from the DOM
    collectedListItems[ i ].classList.add( "animation--pop-off" );
    setTimeout(() => {
      collectedListItems[ i ].remove();
    }, 350);
  }

  // Give list item's check area their appropriate border color
  assignBorderColorToListItemCheckArea( listItems );

  // Display current collected and total item display values
  itemsCollectedValueDisplay.textContent = 0;
  itemsTotalValueDisplay.textContent = listItems.length;

} );

// LIST ITEM EVENT
listItemsContainer.addEventListener( "click", function( e )  {
  if( e.target.classList.contains( "list-item" ) ) {
    disableListItem( e.target );

    // Capture the number of collected items from listItems array
    const itemsCollectedValue = countCollectedItems( listItems );

    // Display the value of collected items
    itemsCollectedValueDisplay.textContent = itemsCollectedValue; 
  }
});

// TRASH EVENT
document.addEventListener( "click", function( e ) {
  if( e.target && e.target.classList.contains( "trash" ) ) {

    // Capture marked list item
    const markedListItem =  e.target.parentElement.parentElement;
    
    // Give marked list item its popOff animation
    markedListItem.classList.add( "animation--pop-off" );

    setTimeout(() => {
      // Remove collected item from the DOM after 350 milliseconds
      markedListItem.remove();
    }, 350);

    // Remove collected item from the listItems array
    const markedListItemIndex = listItems.indexOf( markedListItem );
    listItems.splice( markedListItemIndex, 1 );

    // Adjust the check-area elements border color
    assignBorderColorToListItemCheckArea( listItems )

    // Display total length of list itms
    itemsTotalValueDisplay.textContent = listItems.length;

    // Calculate how many list items are collected
    const itemsCollectedValue = countCollectedItems( listItems );

    // Display collected list items value
    itemsCollectedValueDisplay.textContent = itemsCollectedValue;
  }
} );
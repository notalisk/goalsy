// attached to the onclick of the purchase button in store.handlebars
async function purchase(itemId) {
    console.log('Buying item number ' + itemId);

    const response = await fetch(`/api/users/shop/${itemId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    console.log(response);

    if (response.ok) {
        alert("Successfully purchased!");
        window.location.reload();
    } else {
        alert("Purchase error. Check that you can afford this item.");
    }
};
//Logic for hanburger menu.
let open = document.querySelector(".open");
let close = document.querySelector(".close");
let side_bar = document.querySelector(".side-bar");

open.addEventListener("click",function(){
    close.style.display = 'block';
    side_bar.style.display = "flex";
})

close.addEventListener("click",function(){
    close.style.display = 'none';
    side_bar.style.display = "none";
})


//This variable call data from data.json file
const FetchData = './food.json';


// In This function all the menu items are render on the display from json file.
document.addEventListener("DOMContentLoaded", function(){

  let cardSection = document.querySelector(".card-section");


let menuData = [];

function getMenu() {

    fetch(FetchData)

        .then(response => {

            if (!response.ok) {
                throw new Error("Unable to fetch menu");
            }

            return response.json();

        })

        .then(data => {

            menuData = data;

            cardSection.innerHTML = "";

            data.forEach(item => {

                cardSection.innerHTML += `

                <div class="card">

                    <img src="img/burger.avif" class="card-main-img">

                    <div class="card-content">

                        <div class="card-start-content">

                            <p class="food-name">${item.name}</p>

                            <p class="cost">$${item.price}</p>

                        </div>

                        <div class="card-end-content">

                            <img src="img/Group 4.png">

                        </div>

                    </div>

                </div>

                `;

            });

        })

        .catch(error => {

            console.log(error);

        });

}

  getMenu();


  // In This function random order for burger are placed.
function takeOrder() {

    return new Promise(resolve => {

        setTimeout(() => {

            const burgers = menuData.filter(item =>
                item.name.toLowerCase().includes("burger")
            );

            const order = [];

            for(let i=0;i<3;i++){

                const randomIndex = Math.floor(Math.random()*burgers.length);

                order.push(burgers[randomIndex]);

            }

            resolve({

                items:order

            });

        },2500);

    });

}
  


  // In This function the status of order and payment statuse are returned.
  function orderPrep(){
    return new Promise(resolve => {
      setTimeout(() => {
        let orderPrepObj = {order_status:true, paid:false}
        resolve(orderPrepObj);
      },1500);
    })
  }


  // In This function the status of order and payment statuse are returned.
  function payOrder(){
    return new Promise(resolve => {
      setTimeout(() => {
        let payOrderObj = {order_status:true, paid:true};
        resolve(payOrderObj);
      }, 1000);
    })
  }


  //In this fuction a thankyou message is returned after the payment is done.
  function thankyouFnc(){
    alert('thankyou for eating with us today!');
  }


  //This is the main function which control the flow of all the function.
  function main() {
    takeOrder()
      .then(order => {
        console.log('Your Order:', order);
        return orderPrep(); // Return the promise
      })
      .then(orderStatus => {
        console.log('Order Preparation Status:', orderStatus);
        return payOrder(); // Return the promise
      })
      .then(payOrderStatus => {
        console.log('Payment Status:', payOrderStatus);
        if (payOrderStatus && payOrderStatus.paid) {
          thankyouFnc();
        }
      })
  }
  

  main();
})

function secondScreen(){
  let hideMainImg = document.querySelector('.main_hero_img');
  hideMainImg.style.display = 'none';
};

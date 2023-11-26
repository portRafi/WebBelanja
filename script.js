function print() {
    var contentDiv = document.getElementById('content');
    var contentToPrint = contentDiv.innerHTML;
    var newWindow = window.open('', '_blank');
    newWindow.document.open();
    newWindow.document.write(  contentToPrint  );
    newWindow.document.close();
    newWindow.print();
    updateTax();
  }



function addCart(id) {    
    $('#smwrng').remove(); 
  
    var nama = $('#nama' + id).text(); 
    var harga = parseInt($('#harga' + id).text().replace(/[^\d]/g, '')); 
    var image = $('#img' + id).attr('src'); 
 
    var Product = $('#cart').find('.card-cart[data-id="' + id + '"]'); 
 
    if (Product.length === 0) { 
 
        $('#cart').append( `
                <div class="col-md-12 card-cart" data-id="`+id+`" style="padding: 0; display: flex; flex-direction: column; gap: 10px; margin-top: 1%;" id="belanja">
                <div class="col-md-12 d-flex justify-content-between align-items-center" style="padding: 1px 0px; border: none; border-radius: 10px; background-color: rgb(246, 246, 246);box-shadow: 0px 0px 10px -3px rgba(0,0,0,0.1),0px 10px 15px -3px rgba(0,0,0,0.1); padding: 10px 0px; border-radius: 10px;" id="barang">
                  <div class="col-md-10 p-0" id="detail-kiri">
                    <div class="col-md-12 d-flex justify-content-between align-items-center px-2" >
                      <b id="nama-barang">`+nama+`</b>
                      <h6 class="m-0" id="harga-banyak">Rp. <span id="" class="harga">`+formatHarga(harga)+`</span></h6>
                    </div>
                    <div class="col-md-12 d-flex justify-content-between align-items-center px-2">
                      <h6 class="m-0" id="normal">Unit Price:</h6>
                      <b class="m-0" id="harga-banyak">Rp. `+formatHarga(harga)+`</b>
                      <h6 id="normal">Quantity:</h6>
                      <div>
                          <p class="pcs">1</p>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex">
                        <button onClick="reduceCart(`+id+`)" class="p-0" style="margin-left: 0px; border: none; background-color: rgb(246, 246, 246);"><i class='bx bxs-minus-bx-md' style='color:#f12e2e'  ></i></i>
                        </button>

                        <button onClick="remove(`+id+`)" class="p-0" style="margin-left: 0px; border: none; background-color: rgb(246, 246, 246);">
                        <i class='bx bxs-trash-alt bx-lg'></i>
                        </button>
                  </div>
                </div>  
              </div>`
            
        ); 
 
    } else { 
        var pcsElement = Product.find('.pcs'); 
        var hargaElement = Product.find('.harga'); 
 
        var currentPcs = parseInt(pcsElement.text()); 
        pcsElement.text(currentPcs + 1); 
 
        var totalHarga = harga * (currentPcs + 1); 
        hargaElement.text(formatHarga(totalHarga)); 
 
    } 
 
    var total = 0; 
 
    $('.card-cart').each(function () { 
        var hargaElement = $(this).find('.harga'); 
        var currentHarga = parseInt(hargaElement.text().replace(/[^\d]/g, '')); 
 
        total += currentHarga; 
    }); 
 
    $("#total-harga").empty(); 
    $("#total-harga").append(formatHarga(total + (total * 0.1)));

    updateTax();
} 


function reduceCart(id) { 
    var Product = $('#cart').find('.card-cart[data-id="' + id + '"]'); 
 
    if (Product.length > 0) { 
        var pcsElement = Product.find('.pcs'); 
        var hargaElement = Product.find('.harga'); 
 
        var currentPcs = parseInt(pcsElement.text()); 
 
        if (currentPcs > 1) { 
            pcsElement.text(currentPcs - 1); 
 
            var harga = parseInt($('#harga' + id).text().replace(/[^\d]/g, '')); 
            var totalHarga = harga * (currentPcs - 1); 
            hargaElement.text(formatHarga(totalHarga)); 
             
            var total = 0; 
 
            $('.card-cart').each(function () { 
                var hargaElement = $(this).find('.harga'); 
                var currentHarga = parseInt(hargaElement.text().replace(/[^\d]/g, '')); 
         
                total -= currentHarga; 
            }); 
         
            $("#total-harga").empty(); 

            $("#total-harga").append(formatHarga(total + (total * 0.1)));
         
        } else { 
            Product.remove(); 
 
            var total = 0; 
 
            $('.card-cart').each(function () { 
                var hargaElement = $(this).find('.harga'); 
                var currentHarga = parseInt(hargaElement.text().replace(/[^\d]/g, '')); 
         
                total += currentHarga; 
            }); 
         
            $("#total-harga").empty(); 
            $("#total-harga").append(formatHarga(total + (total * 0.1)));
        } 
    } 
    updateTax();
} 
 
function remove(id) { 
    var Product = $('#cart').find('.card-cart[data-id="' + id + '"]'); 
     
    Product.remove(); 
    var total = 0; 
 
    $('.card-cart').each(function () { 
        var hargaElement = $(this).find('.harga'); 
        var currentHarga = parseInt(hargaElement.text().replace(/[^\d]/g, '')); 
 
        total += currentHarga; 
    }); 
 
    $("#total-harga").empty(); 
 
    $("#total-harga").append(formatHarga(total + (total * 0.1)));

    updateTax();
 
} 
 
function formatHarga(angka) { 
    var reverse = angka.toString().split('').reverse().join(''); 
    var ribuan = reverse.match(/\d{1,3}/g); 
    var formatted = ribuan.join('.').split('').reverse().join('');
    return formatted
}

function updateTax() {
    var total = 0;

    $('.card-cart').each(function () {
        var hargaElement = $(this).find('.harga');
        var currentHarga = parseInt(hargaElement.text().replace(/[^\d]/g, ''));

        total += currentHarga;
    });

    var tax = total * 0.1;
    $("#tax").text(formatHarga(tax));
}
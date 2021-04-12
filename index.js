
let s;
let r;
let m;
let N;
let q;
let a;
let Ko;
let Sn = [];

// RATY


function rataStała(){
    const el = document.createElement("p");
    let t = s/(m*N);
    el.innerText = `T: ${t}`;
    document.querySelector('.cell-1').appendChild(el);
}
function rataZmienna(){
    let tn = [];
    let sumaTn = 0;
        for(let i = 1; i<=N*m; i++){
            const el = document.createElement("p");
            tn[i-1] = s*((Math.pow(q, i) - Math.pow(q, i-1))/(Math.pow(q, m*N) - 1));
            sumaTn += tn[i-1];
            el.innerText = `T${i}: ${tn[i-1]}`;
            document.querySelector('.cell-1').appendChild(el);
        }
        const suma = document.createElement("p");
    suma.innerText = `Suma rat: ${sumaTn}`;
    document.querySelector('.cell-1').appendChild(suma);
}

//KWOTA PŁATNOŚCI

function kwotaPlatnosciStala(){
    const el = document.createElement("p");
    a = s*Math.pow(q, m*N)*((q-1)/(Math.pow(q, m*N)-1));
    el.innerText = `A: ${a}`;
    document.querySelector('.cell-2').appendChild(el);
}
function kwotaPlatnosciZmienna(){
    let sumaAn = 0;
    for(let i = 1; i<=N*m; i++){
        const el = document.createElement("p");
        let an = (s/(N*m))*[1+((N*m)-i+1)*(r/m)];
        sumaAn += an;
        el.innerText = `A${i}: ${an}`;
        document.querySelector('.cell-2').appendChild(el);
    }
    const suma = document.createElement("p");
    suma.innerText = `Suma płatności: ${sumaAn}`;
    document.querySelector('.cell-2').appendChild(suma);
}

// ODSETKI
function odsetkiPrzyStalejRacie(){
    let sumaOs = 0;
    for(let i = 1; i<=N*m; i++){
        const el = document.createElement("p");
        let On = s*[1-((i-1)/(N*m))]*(r/m);
        sumaOs += On;
        el.innerText = `O${i}: ${On}`;
        document.querySelector('.cell-3').appendChild(el);
    }
    const suma = document.createElement("p");
    suma.innerText = `Suma odsetek: ${sumaOs}`;
    document.querySelector('.cell-3').appendChild(suma);
}

function odsetkiPrzyStalejKwocie(){
    saldoPrzyStałejKwocie();
    let On;
    let sumaO = 0;
    for(let i = 1; i<=N*m; i++){
        const el = document.createElement("p");
        if(i === 1){
             On = s*(r/m);
             sumaO += On;
        }else{
             On = Sn[i-2]*(r/m);
             sumaO += On;
        }

        el.innerText = `O${i}: ${On}`;
        document.querySelector('.cell-3').appendChild(el);
    }
    const suma = document.createElement("p");
    suma.innerText = `Suma odsetek: ${sumaO}`;
    document.querySelector('.cell-3').appendChild(suma);
}


//SALDO
function saldoPrzyStałejKwocie(){
    kwotaPlatnosciStala();
    for(let i = 1; i<=N*m; i++){
        const el = document.createElement("p");
        Sn[i-1] = s*(Math.pow((1+(r/m)), i)) - a*((Math.pow((1+(r/m)), i)-1)/((1+(r/m))-1));
        el.innerText = `S${i}: ${Sn[i-1]}`;
        document.querySelector('.cell-4').appendChild(el);
    }
}

function saldoPrzyStałejRacie(){
    for(let i = 1; i<=N*m; i++){
        const el = document.createElement("p");
        let SnS = s*(1-(i/(N*m)));
        el.innerText = `S${i}: ${SnS}`;
        document.querySelector('.cell-4').appendChild(el);
    }
}


//NARASTANIE KAPITAŁU

function narastanieKapitału(){
    for(let i = 1; i<=N; i++){
        const el = document.createElement("p");
        let Kn = Ko*(Math.pow((1+(r/m)), i*m));
        el.innerText = `K${i}: ${Kn}`;
        document.querySelector('.cell-1').appendChild(el);
    }
}



function getData(){
    document.getElementById('confirm').addEventListener('click', () =>{
        s = document.querySelector('.s').value;
        r = document.querySelector('.r').value;
        m = document.querySelector('.m').value;
        N = document.querySelector('.N').value;
        Ko = document.querySelector('.Ko').value;
        q = 1+(r/m);
        let type = document.querySelector('#typ').value;
        const cells = document.querySelectorAll('.cell');

        cells.forEach((el)=>{
            el.innerHTML="";
        });

        switch (type){
            case "1":
                kwotaPlatnosciStala();
            break;
            case "2":
                kwotaPlatnosciZmienna();
            break;
            case "3":
                rataStała();
            break;
            case "4":
                rataZmienna();
            break;
            case "5":
                odsetkiPrzyStalejKwocie();
            break;
            case "6":
                odsetkiPrzyStalejRacie();
            break;
            case "7":
                saldoPrzyStałejKwocie();
            break;
            case "8":
                saldoPrzyStałejRacie();
            break;
            case "9":
            rataZmienna();
            kwotaPlatnosciStala();
            odsetkiPrzyStalejKwocie()
            break;
            case "10":
            rataStała();
            kwotaPlatnosciZmienna();
            odsetkiPrzyStalejRacie();
            saldoPrzyStałejRacie();
            break;
            case "11":
            narastanieKapitału();
            break;
            default:
                console.log("Error");
        }
    });
}
getData();
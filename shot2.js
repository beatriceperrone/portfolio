const puppeteer = require('puppeteer');
(async () => {
  const b = await puppeteer.launch({args:['--no-sandbox'], headless:'new'});
  const p = await b.newPage();
  await p.setViewport({width:390,height:844,hasTouch:true,isMobile:true,deviceScaleFactor:1});
  await p.goto('http://127.0.0.1:4174/', {waitUntil:'networkidle2'});
  await new Promise(r=>setTimeout(r,200));
  // prova a scrollare e verifica se scrollX >0 viene effettuato
  await p.evaluate(()=>window.scrollTo(50,0));
  await new Promise(r=>setTimeout(r,200));
  const s = await p.evaluate(()=>({sx:window.scrollX, sw:document.documentElement.scrollWidth, cw:document.documentElement.clientWidth}));
  console.log('dopo scrollTo(50,0):', JSON.stringify(s));
  await p.screenshot({path:'/tmp/mobile-full.png', fullPage:true});
  await b.close();
})();

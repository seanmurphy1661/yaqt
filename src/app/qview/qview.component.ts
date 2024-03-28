import { Component, Input } from '@angular/core';
import { IEevent } from '../query/query.component';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-qview',
  templateUrl: './qview.component.html',
  styleUrls: ['./qview.component.scss']
})
export class QviewComponent {
  @Input() event_queue:IEevent[]=[];

  display_format:string = "detail";


ngOnInit(){
 console.log("event_queue:",this.event_queue);
}



downloadNotes(){
    // console.log("Start Download",this.event_list.length);
   //
   //  Dump to a file 
   //
   let file = new Blob([JSON.stringify(this.event_queue)], { type: 'text/csv;charset=utf-8' });
   saveAs(file, 'query-results.txt');
 }

 convert_time(unixTime:number):string{
  var dt:Date = new Date(unixTime*1000);
  return dt.toString();
}

shortkey(pubkey:string):string{
  var rc:string="";
    rc = pubkey.substring(0,8) + "..." + pubkey.substring(pubkey.length-5);
  return rc;
}

open_nosta(pubkey:string):void{
  window.open("https://nosta.me/" + pubkey,"_blank");
}

open_njump(id:string):void{
  window.open("https://njump.me/" + id,"_blank");
}

copyText(a:string):void{
  console.log("copyText:",a);
  navigator.clipboard.writeText(a);
  
}
}

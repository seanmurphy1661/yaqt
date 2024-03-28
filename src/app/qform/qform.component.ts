import { Component, Input, Output,EventEmitter } from '@angular/core';
import { bech32 } from 'bech32';
import { IEevent,QueryComponent } from '../query/query.component';
import { Relay } from 'nostr-tools';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-qform',
  templateUrl: './qform.component.html',
  styleUrls: ['./qform.component.scss']
})
export class QformComponent {
  @Input() relayURI:string = "";
  @Input() id:string = "";
  @Input() author:string = "";
  @Input() kind:string  = "";
  @Input() since:string = "";
  @Input() until:string = "";
  @Input() limit:number = 0;
  @Input() tag_name:string = "";
  @Input() tag_data:string = "";
  @Output() eventItem:EventEmitter<IEevent> = new EventEmitter<IEevent>();
  @Output() clearEvents:EventEmitter<void> = new EventEmitter<void>();

  showQueryString:boolean = false;
  connect_msg:string = "";

  relay:any;

  async queryRelay(){
    var sub:any;
    var a:any = this.eventItem; // just a hack 
    
    var q2 = this.buildQueryString();
    
    this.connect_msg = `Connecting to ${this.relayURI}`;
    this.relay = await Relay.connect(this.relayURI);
    this.connect_msg = `Connected  to ${this.relayURI}`;

    this.clearEvents.emit();

    sub = this.relay.subscribe(q2,{
      onevent(event:any) {
        a.emit({
          id:event.id,
          kind:event.kind,
          content:event.content,
          created_at:event.created_at,
          sig:event.sig,
          pubkey:event.pubkey,
          tags:event.tags
        } );
      },
      oneose() {
        sub.close();
      },
    } );
  }

  showQuery(){
    this.showQueryString = true;
  }

  saveQuery(){
    let file = new Blob([JSON.stringify(this.buildQueryString())], { type: 'text/csv;charset=utf-8' })
    saveAs(file, 'query-string.txt');
  }

  prettyQueryString():string{
    var rc:string = ""
      rc = JSON.stringify(this.buildQueryString());
    return rc;
  
  }

  buildQueryString(){
    // query string construction
    var query: string = "";

    if (this.limit > 0 ) {
      query = query + `"limit": ${this.limit}`;
    }
    if (this.id.length > 0){
     if (query.length>0) query = query + ' , ';

      query = query + `"ids": ["${this.id}"]`;
    }
    if (this.author.length > 0){
       if (this.author.substring(0,5) == "npub1"){
         try {
           const { prefix, words } = bech32.decode(this.author);
           const bytes = bech32.fromWords(words).slice(0, 32);
           this.author = this.toHexString(bytes);
           if (query.length>0) query = query + ' , ';
           query = query + `"authors": ["${this.author}"]`;
         }catch{
           this.connect_msg = "check the npub again."
         }
       }else{
         if (query.length>0) query = query + ' , ';
         query = query + `"authors": ["${this.author}"]`;
       }
    }
    if (this.since.length > 0 ) {
     if (query.length>0) query = query + ' , ';
     query = query + `"since": ${this.since}`;
    }
     if (this.kind.length > 0 ) {
       if (query.length>0) query = query + ' , ';
       query = query + `"kinds": [${this.kind}]`;
    }
    if (this.tag_name.length > 0 ){
     if (query.length>0) query = query + ' , ';
    
     query = query + `, "#${this.tag_name}": ["${this.tag_data}"]`;
    }
    var q2 = JSON.parse(`[{ ${query} }]`);
    // end query string construction 
    return q2;
}

toHexString(byteArray:number[] ) {
  return Array.from(byteArray, function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('')
}


}

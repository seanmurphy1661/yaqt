import { Component } from '@angular/core';

export interface IEevent{
  id:string;
  kind:number;
  pubkey:string;
  content:string;
  created_at:number;
  sig:string;
  tags:string;
}


@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent {
  
  relayURI:string = "wss://relay.damus.io"; //biggest relay on planet
  id:string = "";
  author:string = "82341f882b6eabcd2ba7f1ef90aad961cf074af15b9ef44a09f9d2a8fbfbe6a2"; //jacks pubkey
  kind:string  = "1"; //standard notes
  since:string = "";
  until:string = "";
  limit:number = 20;
  tag_name:string = "";
  tag_data:string = "";

  event_queue:IEevent[]=[];

  addEvent(newItem:IEevent){
    this.event_queue.push(newItem);
  }

  clearEvents(){
    this.event_queue = [];
  }
}

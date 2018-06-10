export class TrackChart {
  StartNode: boolean;
  EndNode: boolean;
  Nodes: Node[] = new Array();
  Title: string;
  CurrentState: string;
  ChildState: string;
  ShowTitle: boolean;
  Alerts: Object = {
    'Success': {
      Name: 'Success',
      Title: 'Success',
      Color: 'green',
      Link: 'http://google.com'
    } as Alert,
    'Error': {
      Name: 'Error',
      Title: 'Error',
      Color: 'green',
      Link: 'http://google.com'
    } as Alert,
    'Warning': {
      Name: 'Warning',
      Title: 'Warning',
      Color: 'yellow',
      Link: 'http://google.com'
    } as Alert,
    'Info': {
      Name: 'Info',
      Title: 'Info',
      Color: 'blue',
      Link: 'http://google.com'
    } as Alert,
  };
  Config: TrackChartConfig = new TrackChartConfig();
  Count(): number {
    return this.Nodes.length;
  };
}

export class Alert {
  Name: string;
  Title: string;
  Color: string;
  Link: string;
}
export class Node {
  Name: string;
  Title: string;
  Link: string;
  Type: NodeType;
  Childeren: Node[];
  Description: string;
  Display: DisplayType;
  ImageURL: string;
  DisplayText: string;
  AlertName: string;
  ChildCount(): number {
    return this.Childeren.length;
  };

}

export class TrackChartConfig {
  FillColor: string = "";
  UnFillColor: string = "";
  UnFillNodeColor: string = "";
  TextColor: string = "";
  TitleColor: string = "";
  Font: string = "";
}


export enum NodeType {
  Start,
  Intermediate,
  End,
  Child
}

export enum DisplayType {
  Text,
  Image
}

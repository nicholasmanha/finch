export interface Entry {
  var_type: string;  
  location: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  name: string;    
};
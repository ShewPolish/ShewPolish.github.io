define(function() {
  "use strict";
  function Table(name, data) {
    this.name = name;
    this.data = data;
  }
  
  Table.prototype = {
    constructor: Table
  }
  
  return Table;
});
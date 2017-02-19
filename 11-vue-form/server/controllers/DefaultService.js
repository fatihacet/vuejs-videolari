'use strict';

let labelId = 1;
let labels = [];


exports.labelsGet = function(args, res, next) {
  /**
   *
   * no response value expected for this operation
   **/
  res.end(JSON.stringify(labels));
}


exports.labelsAdd = function(args, res, next) {
  /**
   *
   * title String
   * color String
   * description String  (optional)
   * no response value expected for this operation
   **/
  const { title, description, color } = args;
  const label = {
    id: labelId++,
    title: title.value,
    description: description.value || '',
    color: color.value
  };

  labels.push(label);

  res.end(JSON.stringify(label));
}


exports.labelsRemove = function(args, res, next) {
  /**
   *
   * id String
   * no response value expected for this operation
   **/
  let id = args.id.value;

  labels = labels.filter((label) => {
    return label.id != parseInt(id, 10);
  });

  res.end(JSON.stringify({ result: true }));
}

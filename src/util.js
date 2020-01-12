function merge(left,right){
    var newSortArr=[];
    var i=0,j=0;
    while(i<left.length && j<right.length){
        if(Number(left[i])>Number(right[j])){
        newSortArr.push(right[j++])
        }else{
          newSortArr.push(left[i++])
        }
    }
   return newSortArr
          .concat(left.slice(i))
          .concat(right.slice(j));
  }

  export function sorting(arr){
    var len=arr.length;
     if(len===1)return arr;//base
    var mid=Math.floor(len/2);
    var left=arr.slice(0,mid);
    var right=arr.slice(mid);
    return merge(sorting(left),sorting(right));
    }


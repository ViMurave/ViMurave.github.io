(function(){
	//,sin=sin,P=pow,R=random;
	var plot = new Plotter('plot',{
left: -2,
right: 2,
top: 2,
bottom: -2,
width:400,
height: 600,
accuracy: 5000,
zoom: true});
var tdforbutton=document.getElementById("visualmath-button");
var tdforinput=document.getElementById("visualmath-input");
tdforbutton.onclick=change;
var func;
var eps = 0.00000000001; // точность 
var xmin = -2, xmax = 2, ymin = -2, ymax = 2; // границы окна
function change(){
	plot = new Plotter('plot',{
left: -2,
right: 2,
top: 2,
bottom: -2,
width:400,
height: 600,
accuracy: 5000,
zoom: true});
	console.log(tdforinput.value)
	//.replace(/pow/g, "Math.pow")
	try{
		var string = 'return '+tdforinput.value;
		console.log(string.replace(/cos/g, "Math.cos").replace(/sin/g, "Math.sin").replace(/tg/g, "Math.tan")
	.replace(/ctg/g, "Math.catan").replace(/ln/g, "Math.log").replace(/sqrt/g, "Math.sqrt")
	.replace(/abs/g, "Math.abs").replace(/xx/g, "x*x").replace(/xx/g, "x*x").replace(/yy/g, "y*y").replace(/yy/g, "y*y")
	.replace(/yx/g, "y*x").replace(/yx/g, "y*x").replace(/xy/g, "x*y").replace(/xy/g, "x*y")
	.replace(/0x/g, "0*x").replace(/1x/g, "1*x").replace(/2x/g, "2*x").replace(/3x/g, "3*x")
	.replace(/4x/g, "4*x").replace(/5x/g, "5*x").replace(/6x/g, "6*x").replace(/7x/g, "7*x")
	.replace(/8x/g, "8*x").replace(/9x/g, "9*x").replace(/0y/g, "0*y").replace(/1y/g, "1*y")
	.replace(/2y/g, "2*y").replace(/3y/g, "3*y").replace(/4y/g, "4*y").replace(/5y/g, "5*y")
	.replace(/6y/g, "6*y").replace(/7y/g, "7*y").replace(/8y/g, "8*y").replace(/9y/g, "9*y"))
	
	func = new Function('x,y',string.replace(/cos/g, "Math.cos").replace(/sin/g, "Math.sin").replace(/tg/g, "Math.tan")
	.replace(/ctg/g, "Math.catan").replace(/ln/g, "Math.log").replace(/sqrt/g, "Math.sqrt")
	.replace(/abs/g, "Math.abs").replace(/xx/g, "x*x").replace(/xx/g, "x*x").replace(/yy/g, "y*y").replace(/yy/g, "y*y")
	.replace(/yx/g, "y*x").replace(/yx/g, "y*x").replace(/xy/g, "x*y").replace(/xy/g, "x*y")
	.replace(/0x/g, "0*x").replace(/1x/g, "1*x").replace(/2x/g, "2*x").replace(/3x/g, "3*x")
	.replace(/4x/g, "4*x").replace(/5x/g, "5*x").replace(/6x/g, "6*x").replace(/7x/g, "7*x")
	.replace(/8x/g, "8*x").replace(/9x/g, "9*x").replace(/0y/g, "0*y").replace(/1y/g, "1*y")
	.replace(/2y/g, "2*y").replace(/3y/g, "3*y").replace(/4y/g, "4*y").replace(/5y/g, "5*y")
	.replace(/6y/g, "6*y").replace(/7y/g, "7*y").replace(/8y/g, "8*y").replace(/9y/g, "9*y")
	);
	implicit_plot(xmin,xmax,ymin,ymax,0,false,[]);
	console.log("ready")
	}
	catch(err){alert(err)}	
}

console.log("return x*x+y*y-1,return x-y*y,		return y - x*x,		return (x*x+y*y)*(x*x+y*y)-(x*x-y*y),		return x*x*x +y*y*y-3*x*y,		return x+y-1");
console.log("return x-1,		return y-1,		return x*x-y*y-1,		return Math.pow(x,2/3)+Math.pow(y,2/3)-1,		return (x*x+y*y+2*x)*(x*x+y*y+2*x)-4*(x*x+y*y)");
console.log("		return x*x+(y-Math.sqrt(Math.abs(x)))*(y-Math.sqrt(Math.abs(x)))-1")
	var range= function(a, b, step){
		var A= [];
		A[0]= a;
		step= step || 1;
		while(a+step<= b){
			a = a+step;
			
			A[A.length]= Math.round(a *1000) /1000
		}
		A[A.length]= b;
		return A;
	}
	function find_amount_inter(arr_search, line, variant_line){
		var point_find = []
		if(variant_line=="x"){

			for (var j = 0; j < arr_search.length-1;j++){
				var f_a = func(line,arr_search[j]);
				var f_b = func(line,arr_search[j+1]);
				if (Math.abs(f_a)<eps){
					var cord_x = line;
					var cord_y = arr_search[j];
					point_find[point_find.length]={x: cord_x,y:cord_y};
				}
				else{				
					if (f_a*f_b<0 && (Math.abs(f_b)>=eps))
					{
						var cord_x = line;
						var cord_y = find_y(arr_search[j],f_a,arr_search[j+1],line);
						point_find[point_find.length]={x: cord_x,y:cord_y};
					}
				}				
			}
			return point_find
		}
		if(variant_line == "y"){
			for (var j = 0; j < arr_search.length-1;j++){
				var f_a = func(arr_search[j],line);
				var f_b = func(arr_search[j+1],line);
				if (Math.abs(f_a)<eps){
					var cord_y = line;
					var cord_x = arr_search[j];
					point_find[point_find.length]={x: cord_x,y:cord_y};
				}
				else{				
					if (f_a*f_b<0 && (Math.abs(f_b)>=eps))
					{
						var cord_y = line;
						var cord_x = find_x(arr_search[j],f_a,arr_search[j+1],line);
						point_find[point_find.length]={x: cord_x,y:cord_y};
					}
				}				
			}
			return point_find
		}
	}
	function implicit_plot(xmin_1,xmax_1, ymin_1,ymax_1, i, flag, point) {
		var xx = range(xmin_1,xmax_1,0.001);
		var yy = range(ymin_1,ymax_1,0.001);
		//console.log(yy.length)
		var tmp = i;
		var par_arr = point;
		//if(flag) {par_arr[par_arr.length]={x: point.x,y:point.y}; flag = false};
		//console.log(par_arr)
		while (tmp != xx.length){
			var point_tmp = find_amount_inter(yy, xx[tmp], "x");
			
			switch(point_tmp.length){
				case 0:
					if(par_arr.length!=0){
						
						
						
						var find_x_min = find_amount_inter(xx, ymin_1, "y");
						if(find_x_min.length!=0){
						console.log(find_x_min)
						var f_ind_min = -1;
						for(var k=0; k<find_x_min.length; k++){
							if(find_x_min[k].x>=xx[tmp-1]&&find_x_min[k].x<=xx[tmp])
								{
									f_ind_min = k;
									break;
								}
							}
						if(f_ind_min != -1) par_arr[par_arr.length] = find_x_min[f_ind_min];
						
						var f_ind_min2 = -1;
						for(var k=0; k<find_x_min.length; k++){
							//console.log(par_arr[0]-0.001,find_x_min[k].x,par_arr[0])
							if(find_x_min[k].x>=(par_arr[0].x-0.001)&&find_x_min[k].x<=par_arr[0].x)
								{
									f_ind_min2 = k;
									break;
								}
							}
						if(f_ind_min2 != -1) par_arr.unshift(find_x_min[f_ind_min2]);
						}
						
						
						var find_x_max = find_amount_inter(xx, ymax_1, "y");
						if(find_x_max.length!=0){
							var f_ind_max = -1;
							for(var k=0; k<find_x_max.length; k++){
								if(find_x_max[k].x>=xx[tmp-1]&&find_x_max[k].x<=xx[tmp])
									{
										f_ind_max = k;
										break;
									}
								}
							if(f_ind_max != -1) par_arr[par_arr.length] = find_x_max[f_ind_max];
						var f_ind_max2 = -1;
						for(var k=0; k<find_x_max.length; k++){
							//console.log(par_arr[0]-0.001,find_x_min[k].x,par_arr[0])
							if(find_x_max[k].x>=(par_arr[0].x-0.001)&&find_x_max[k].x<=par_arr[0].x)
								{
									f_ind_max2 = k;
									break;
								}
							}
						if(f_ind_max2 != -1) par_arr.unshift(find_x_max[f_ind_max2]);
						}
						plot.addParametricFunc(par_arr);
						par_arr = [];
					}
					tmp+=1;
					break;
				case 1:
					par_arr[par_arr.length]={x:point_tmp[0].x, y: point_tmp[0].y};
					tmp += 1;
					break;
				case yy.length-1:
					tmp += 1;
					plot.addParametricFunc(point_tmp);
					break;
				default:

						var new_yy = [ymin_1];
						for (var g = 0; g < point_tmp.length-1; g++){
							new_yy[new_yy.length]=(point_tmp[g].y+point_tmp[g+1].y)/2;
						}
						new_yy[new_yy.length]=ymax_1;
						if(tmp == 0){ // например -x-yy
						console.log(point_tmp)
							for (var g = 0; g < new_yy.length-1; g++){
								implicit_plot(xmin_1,xmax_1, new_yy[g],new_yy[g+1], 0, true, [point_tmp[g]])
							}				
							tmp = xx.length;
							}
						else{
							var arr_zero_inter = [];
							for (var g = 1; g < new_yy.length-1; g++){
								var find_x = find_amount_inter(xx, new_yy[g], "y");
								var f_ind = -1;
								//console.log(xx[tmp],xx[tmp-1])
								for(var k=0; k<find_x.length; k++){
									//console.log(find_x[k])
									if(find_x[k].x>=xx[tmp-1]&&find_x[k].x<=xx[tmp])
									{
										f_ind = k;
										break;
									}
								}
								if(f_ind == -1)
									arr_zero_inter.push(new_yy[g])
							}
							console.log('arr_zero_inter', arr_zero_inter);
							if(arr_zero_inter.length!=0){
								arr_zero_inter.unshift(ymin_1);
								arr_zero_inter.push(ymax_1);
								var gg = 1;
								while(gg != arr_zero_inter.length){
									implicit_plot(xx[tmp-1],xmax_1, arr_zero_inter[gg-1],arr_zero_inter[gg], 0, true, []);
									gg = gg+1;
								}
								tmp = xx.length;
							}
							else{
								for (var g = 0; g < new_yy.length-1; g++){
								implicit_plot(xx[tmp-1],xmax_1, new_yy[g],new_yy[g+1], 0, true, [point_tmp[g]])
								}
				
				
								tmp = xx.length;
								/*if(par_arr.length == 0){
									
								}
								else{
									tmp = xx.length;
								}*/
								
							}
							
						}
					/*if(tmp == 0){
						var new_yy = [ymin_1];
						for (var g = 0; g < point_tmp.length-1; g++){
							new_yy[new_yy.length]=(point_tmp[g].y+point_tmp[g+1].y)/2;
						}
						new_yy[new_yy.length]=ymax_1;
						for (var g = 0; g < new_yy.length-1; g++){
							implicit_plot(xmin_1,xmax_1, new_yy[g],new_yy[g+1], 0, true, [point_tmp[g]])
						}				
						tmp = xx.length;
					}
					else{
						var new_yy = [ymin_1];
						for (var g = 0; g < point_tmp.length-1; g++){
							new_yy[new_yy.length]=(point_tmp[g].y+point_tmp[g+1].y)/2;
						}
						new_yy[new_yy.length]=ymax_1;
						if(par_arr.length == 0){
							console.log('point_tmp', point_tmp)
							arr_zero_inter = []
							for (var g = 1; g < new_yy.length-1; g++){
								var find_x = find_amount_inter(xx, new_yy[g], "y");
								var f_ind = -1;
								//console.log(xx[tmp],xx[tmp-1])
								for(var k=0; k<find_x.length; k++){
									//console.log(find_x[k])
									if(find_x[k].x>=xx[tmp-1]&&find_x[k].x<=xx[tmp])
									{
										f_ind = k;
										break;
									}
								}
								if(f_ind == -1)
									arr_zero_inter.push(new_yy[g])
							}
							console.log('arr_zero_inter', arr_zero_inter);
							if(arr_zero_inter.length!=0){
								arr_zero_inter.unshift(ymin_1);
								arr_zero_inter.push(ymax_1);
								
								//implicit_plot(xx[tmp-1],xmax_1, 0,2, 0, true, []);
								var gg = 1;
								while(gg != arr_zero_inter.length){
									implicit_plot(xx[tmp-1],xmax_1, arr_zero_inter[gg-1],arr_zero_inter[gg], 0, true, []);
									gg = gg+1;
								}
								//for (var gg = 1; gg < arr_zero_inter.length; gg++){
									//console.log(arr_zero_inter[gg-1], arr_zero_inter[gg]);
									//implicit_plot(xx[tmp-1],xmax_1, arr_zero_inter[g],arr_zero_inter[g+1], 0, true, []);
								//implicit_plot(xx[tmp-1],xmax_1, arr_zero_inter[gg-1],arr_zero_inter[gg], 0, true, []);
								
								//g+=1
								//}
								tmp = xx.length;
								console.log("zero");
							}
							else{
									for (var g = 1; g < new_yy.length-1; g++){
										console.log("two")
									var find_x = find_amount_inter(xx, new_yy[g], "y");
									var f_ind = -1;
									//console.log(xx[tmp],xx[tmp-1])
									for(var k=0; k<find_x.length; k++){
										//console.log(find_x[k])
										if(find_x[k].x>=xx[tmp-1]&&find_x[k].x<=xx[tmp])
										{
											f_ind = k;
											break;
										}
									}
									if(f_ind != -1){
										implicit_plot(xx[tmp],xmax_1, new_yy[g-1],new_yy[g], 0, true, [find_x[f_ind]])
										implicit_plot(xx[tmp],xmax_1, new_yy[g],new_yy[g+1], 0, true, [find_x[f_ind]])
										g = g + 1
										tmp = xx.length;
									}
									else{
										
										console.log("here")
										tmp = xx.length;
									}

								}
							}
							
							/*for (var g = 1; g < new_yy.length-1; g++){
								var find_x = find_amount_inter(xx, new_yy[g], "y");
								var f_ind = -1;
								//console.log(xx[tmp],xx[tmp-1])
								for(var k=0; k<find_x.length; k++){
									//console.log(find_x[k])
									if(find_x[k].x>=xx[tmp-1]&&find_x[k].x<=xx[tmp])
									{
										f_ind = k;
										break;
									}
								}
								if(f_ind != -1){
									implicit_plot(xx[tmp],xmax, new_yy[g-1],new_yy[g], 0, true, [find_x[f_ind]])
									implicit_plot(xx[tmp],xmax, new_yy[g],new_yy[g+1], 0, true, [find_x[f_ind]])
									g = g + 1
									//tmp = xx.length;
								}
								else{
									
									console.log("here")
									tmp = xx.length;
								}

							}
							
						}
						else{
							tmp == xx.length;
							/*for (var g = 1; g < new_yy.length-1; g++){
								var find_x = find_amount_inter(xx, new_yy[g], "y");
								var f_ind = -1;
								//console.log(xx[tmp],xx[tmp-1])
								for(var k=0; k<find_x.length; k++){
									//console.log(find_x[k])
									if(find_x[k].x>=xx[tmp-1]&&find_x[k].x<=xx[tmp])
									{
										f_ind = k;
										break;
									}
								}
								if(f_ind == -1){
									implicit_plot(xx[tmp-1],xmax_1, ymin_1,new_yy[g], 0, true, [])
									implicit_plot(xx[tmp-1],xmax_1, new_yy[g],ymax_1, 0, true, [])
									tmp = xx.length;
									break;
								}
								else{
									
									tmp = xx.length;
								}

							}
						}
							
					}*/
					break;
			}
		}
		
		if (par_arr.length!=0) 
		{
			
						var find_x_min = find_amount_inter(xx, ymin_1, "y");
						if(find_x_min.length!=0){
						console.log(find_x_min)

						
						var f_ind_min2 = -1;
						for(var k=0; k<find_x_min.length; k++){
							//console.log(par_arr[0]-0.001,find_x_min[k].x,par_arr[0])
							if(find_x_min[k].x>=(par_arr[0].x-0.001)&&find_x_min[k].x<=par_arr[0].x)
								{
									f_ind_min2 = k;
									break;
								}
							}
						if(f_ind_min2 != -1) par_arr.unshift(find_x_min[f_ind_min2]);
						}
						
						
						var find_x_max = find_amount_inter(xx, ymax_1, "y");
						if(find_x_max.length!=0){
							
						var f_ind_max2 = -1;
						for(var k=0; k<find_x_max.length; k++){
							//console.log(par_arr[0]-0.001,find_x_min[k].x,par_arr[0])
							if(find_x_max[k].x>=(par_arr[0].x-0.001)&&find_x_max[k].x<=par_arr[0].x)
								{
									f_ind_max2 = k;
									break;
								}
							}
						if(f_ind_max2 != -1) par_arr.unshift(find_x_max[f_ind_max2]);
						}
						console.log(find_x_min)
						console.log(find_x_max)
						console.log("par_arr_end", par_arr)
			plot.addParametricFunc(par_arr);
			}
		
	}

	function find_x(a,f_a,b,y){
		root=(a+b)/2;
		while (Math.abs(b-a)>eps/2){
			f_r=func(root,y);
			if (Math.abs(f_r)<eps)
			break;
			if(f_a*f_r<=0) //%стандартный алгоритм 
			{
				b=root;
				root=(a+b)/2;}
			else
			{
				a=root;  
				f_a=f_r;
				root=(a+b)/2;}


		} //% ищем корень, пока отрезок не меньше eps
		return root
	}
	function find_y(a,f_a,b,x){
		root=(a+b)/2;
		while (Math.abs(b-a)>eps/2){
			f_r=func(x,root);
			if (Math.abs(f_r)<eps)
			break;
			if(f_a*f_r<=0) //%стандартный алгоритм 
			{
				b=root;
				root=(a+b)/2;}
			else
			{
				a=root;  
				f_a=f_r;
				root=(a+b)/2;}


		} //% ищем корень, пока отрезок не меньше eps
		return root
	}

})();
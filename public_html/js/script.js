var date=new Date,day=date.getDate(),month=date.getMonth()+1,year=date.getFullYear(),hour=date.getHours()+14,minutes=date.getMinutes()+24,seconds=date.getSeconds()+49;60<=seconds&&(seconds-=60,minutes++),60<=minutes&&(minutes-=60,hour++),24<=hour&&(hour-=24,day++);for(var dateString=year+"/"+month+"/"+day+" "+hour+":"+minutes+":"+seconds,currDateString=(new Date).toString(),currDateEl=currDateString.split(" "),currDate=currDateEl[1]+" "+currDateEl[2]+", "+currDateEl[3],sectionDate=document.getElementsByClassName("date"),i=0;i<sectionDate.length;i++)sectionDate[i].innerHTML=currDate;
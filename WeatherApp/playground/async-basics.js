console.log('Starting App')


setTimeout(() => {
  console.log("Inside of callback")
}, 2000)

console.log('Finishing App')

for(i=0;i<1000000;i++) {
  console.log(i)
}
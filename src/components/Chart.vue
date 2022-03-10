<template>
<center>
    <v-card  class="mx-auto" max-width="244">
   <v-card-title>Total Books Read</v-card-title>
    <v-card-text><p class="text-h4 text--primary">{{this.$store.state.books.length}}</p></v-card-text>
    </v-card>
    <br />
    <v-divider></v-divider>
     <br />
     <highcharts :options="lineNumPagesOpt"></highcharts>
    <highcharts :options="columnNumBookOpt"></highcharts>
</center>
</template>

<script>
export default {
  name: "Chart",
  data() {
    return {
      lineNumPagesOpt: {
        title: {
        text: 'Pages read per year'
          },
        xAxis: {
          categories: ['2006', '2007', '2008', '2009', '2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022']
          },
        series: [{
          name: 'Number of Pages',
          type: 'line',
          data: this.$store.state.chartDataPagesPerYear
        }]
      },
    columnNumBookOpt: {
        title: {
        text: 'Books read per year'
          },
        xAxis: {
          categories: ['2006', '2007', '2008', '2009', '2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021']
          },
        series: [{
          name: 'Number of Books',
          type: 'column',
          data: this.$store.state.chartDataBooksPerYear
        }]
      }
    }
  },};
</script>
<style>

</style>
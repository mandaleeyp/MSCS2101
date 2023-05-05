export const formatNumber = (
    number = 0
  ) => {
    const num = parseFloat(Math.abs(number))
    const formattedNumWithDecimals = (num / 1.00).toFixed(2)
  
    const formattedNum = new Intl.NumberFormat('en-US', { minimumFractionDigits: decimals }).format(formattedNumWithDecimals)
    
    return <span className={styles.dollar}><span>$</span>{formattedNum}</span>
  }
  
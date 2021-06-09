import React from 'react'
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  iconCell: {
    padding: 0,
    height: 48,
    width: 48
  }
})

const SizeTable = (props) =>{
  const classes = useStyles();

  const sizes = props.sizes

  return(
    <TableContainer>
       <Table>
         <TableBody>
             {sizes.length > 0 && (  /*sizes.lengthが0以上の場合表示する*/
                sizes.map(size => (
                   <TableRow key={size.size}> 
                      <TableCell component="th" scope="row">
                      {size.size}   {/*洋服サイズL LLなど*/}
                      </TableCell>
                      <TableCell>
                        残り{size.quantity}点
                      </TableCell>
                      
                      <TableCell className={classes.iconCell}>
                      {size.quantity > 0 ?(     //0以上であればIconボタンを表示　　{/*addProduct=>ProductDetailで関数定義されている*/}
                        <IconButton onClick={ () => props.addProduct(size.size)}> {/*addProductには選択されたsizeを渡したいmapで回している{size.size}*/}
                            <ShoppingCartIcon />
                        </IconButton>
                      ):(
                        <div>売り切れ</div>　　　　//0なら売り切れ
                      )}
                      </TableCell>
                      
                     <TableCell className={classes.iconCell}>
                        <IconButton>
                        <FavoriteBorderIcon />
                        </IconButton>
                      </TableCell>
                   </TableRow>
               ))
             )}  
         </TableBody>
       </Table>
    </TableContainer>

  )
}

export default SizeTable
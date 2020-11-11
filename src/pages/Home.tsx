import React, {useEffect, useState} from 'react';
import ItemCard, {ItemCardTypes} from "../components/ItemCard";
import {
  Container,
  Grid,
  GridSpacing,
  createStyles,
  Theme
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ShopBag from "../components/ShopBag";
import PizzasManager from "../managers/PizzasManager";
import {IPizza} from "../types/IPizza";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  }),
);

const Home = () => {
  const [spacing, setSpacing] = React.useState<GridSpacing>(2);
  const [pizzas, setPizzas] = useState<Array<IPizza>>([])
  const classes = useStyles();

  const getPizzas = async () => {
    try {
      const response = await PizzasManager.getPizzas();
      if (response) {
        setPizzas(response.data);
      }
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    getPizzas();
  }, []);

  return (
    <div className="home">
      <ShopBag/>
      <section className="item-cards">
        <Container>
          <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={spacing}>
                {pizzas.map((pizza: IPizza) => (
                  <Grid key={pizza.id} item>
                    <ItemCard data={pizza} type={ItemCardTypes.menu}/>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </section>
    </div>
  );
}

export default Home;

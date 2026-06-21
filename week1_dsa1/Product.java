import java.util.*;
public class Product{
    int product_id;
    String product_name;
    String category;

    public Product(int product_id,String product_name,String category){
        this.product_id=product_id;
        this.product_name=product_name;
        this.category=category;

    }

    public static void main(String[] args) {
        int n=0;
        Scanner sc=new Scanner(System.in);
        ArrayList<Product> products=new ArrayList<>();

        System.out.println("enter the no of products:");
        n=sc.nextInt();

        for(int i=0;i<n;i++){
            System.out.println("enter the product id:");
            int p=sc.nextInt();

            System.out.println("enter the product name:");
            String na=sc.next();

            System.out.println("enter the category:");
            String ca=sc.next();

            products.add(new Product(p, na, ca));

        }
        System.out.println("-------------------PRODUCT LIST-----------------");
        for(Product p:products){
            System.out.println(p.category+" "+p.product_id+" "+p.product_name);
        }

        System.out.println("enter the prouct to search:");
        String se=sc.next();

        System.out.println("----------IN LINEAR SEARCH --------");

        for(Product p:products){
            if(p.product_name.equals(se))
                {
                    System.out.println("---------element found --------");
                    System.out.println(p.category+" "+p.product_id+" "+p.product_name);
                }
        }

        System.out.println("-------------IN BINARY SEARCH---------------");
       Collections.sort(products,Comparator.comparingInt(p -> p.product_id));
       System.out.println("ENTER THE PID TO SEARCH:");
       int sea=sc.nextInt();
       Product key = new Product(sea, "", "");

       int index=Collections.binarySearch(products,key,Comparator.comparingInt(p -> p.product_id));

       if(index>=0){
        System.out.println("element found");
       }
       else{
        System.out.println("element not found");
       }
        // 
        //System.out.println(products[0]);
    }

}

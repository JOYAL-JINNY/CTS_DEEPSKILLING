import java.util.*;
public class Finance {

    public static double calcfinance(double amount,int noofyear){
        if (noofyear==0){
            return amount;
        }
        else{
            noofyear-=1;
            return calcfinance(amount=amount*1.10,noofyear);
            
        }
    }

    public static void main(String [] args){
        Scanner sc=new Scanner(System.in);

        System.out.println("enter the year to predict in count:");
        int n=sc.nextInt();

        double final_amt=calcfinance(10000, n);
        System.out.println("The Predicted Amount:"+final_amt);

    }
    
}

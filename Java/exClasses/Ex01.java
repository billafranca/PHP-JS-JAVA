package contateste;
import javax.swing.JOptionPane;
import java.util.Scanner;

public class ContaTeste {
    
    
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Conta pedrao = new Conta();
        Conta andrezudo = new Conta( );


        pedrao.saldo = (2456.00);
        
        pedrao.nomeCliente = JOptionPane.showInputDialog("nome do cliente: ");
        JOptionPane.showMessageDialog(null, "olá! " + pedrao.nomeCliente);

        JOptionPane.showInputDialog( "digite sua senha para entrar: ");
        pedrao.senha (sc.nextDouble());

        
        pedrao.exibirSaldo();
        
        JOptionPane.showInputDialog(null, pedrao.nomeCliente + " insira quanto deseja sacar: ");
        pedrao.sacar (sc.nextDouble());
        
        JOptionPane.showInputDialog(null, pedrao.nomeCliente + " insira quanto deseja depositar: ");
        pedrao.depositar(sc.nextDouble());
        pedrao.exibirSaldo();

        JOptionPane.showInputDialog(null, " insira o valor da transferência: ");
        pedrao.transferir(andrezudo, (sc.nextDouble()));
        pedrao.exibirSaldo();
        sc.close();
    }
        
}
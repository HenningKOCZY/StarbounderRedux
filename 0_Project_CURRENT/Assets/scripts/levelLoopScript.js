var increment: float;

function OnTriggerEnter(other: Collider) {
	//print("blah");
	if (other.name=="frontColl")	transform.parent.position.z+=increment*2;
}